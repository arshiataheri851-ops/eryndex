(() => {
 const apiBase = (document.body.dataset.apiBase || window.ATLASRAG_API_BASE || "").replace(/\/+$/, "");
 const state = document.getElementById("apiState");
 const docs = document.getElementById("documentList");
 const count = document.getElementById("documentCount");
 const form = document.getElementById("queryForm");
 const input = document.getElementById("questionInput");
 const ask = document.getElementById("askButton");
 const status = document.getElementById("queryStatus");
 const answerPanel = document.getElementById("answerPanel");
 const answerText = document.getElementById("answerText");
 const citationList = document.getElementById("citationList");
 const citationCount = document.getElementById("citationCount");
 const groundedPill = document.getElementById("groundedPill");
 const methodLabel = document.getElementById("methodLabel");
 const charCount = document.getElementById("characterCount");
 const setApiState = (kind, label) => { state.className = "api-state " + kind; state.querySelector("span").textContent = label; };
 const setStatus = (message, error=false) => { status.textContent = message; status.classList.toggle("error", error); };
 const esc = value => String(value ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
 const loadDocuments = async () => {
   if (!apiBase) { setApiState("offline","API endpoint not configured"); docs.innerHTML = '<p class="corpus-note-text">The public API endpoint will appear here when deployment is configured.</p>'; count.textContent = "—"; setStatus("The interactive interface is ready. The API connection is awaiting deployment.", true); return; }
   try {
     const response = await fetch(apiBase + "/demo/documents", {headers:{"Accept":"application/json"}});
     if (!response.ok) throw new Error("API returned " + response.status);
     const data = await response.json();
     count.textContent = data.length;
     docs.innerHTML = data.map(doc => '<div class="document-item"><b>'+esc(doc.title)+'</b><span>'+esc(doc.language.toUpperCase())+' · '+esc(doc.document_id)+'</span></div>').join("");
     setApiState("online","API connected");
     setStatus("Connected. Your questions are searched against the read-only sample corpus.");
   } catch (error) {
     setApiState("offline","API unavailable");
     docs.innerHTML = '<p class="corpus-note-text">Could not load the sample corpus. Please try again shortly.</p>';
     setStatus("Could not connect to the demo API. " + error.message, true);
   }
 };
 const runQuery = async question => {
   const q = question.trim();
   if (q.length < 2) { setStatus("Please enter a question with at least two characters.", true); return; }
   if (!apiBase) { setStatus("The API endpoint is not configured yet.", true); return; }
   ask.disabled = true; ask.querySelector("span").textContent = "SEARCHING";
   answerPanel.hidden = true; setStatus("Searching the sample documents…");
   try {
     const response = await fetch(apiBase + "/demo/query", {method:"POST",headers:{"Content-Type":"application/json","Accept":"application/json"},body:JSON.stringify({question:q,top_k:3})});
     const body = await response.json();
     if (!response.ok) throw new Error(body.detail || ("API returned " + response.status));
     answerText.textContent = body.answer;
     groundedPill.textContent = body.grounded ? "GROUNDED" : "NO EVIDENCE";
     groundedPill.classList.toggle("ungrounded", !body.grounded);
     methodLabel.textContent = (body.retrieval_method || "LEXICAL RETRIEVAL").replace(/_/g," ").toUpperCase();
     citationCount.textContent = body.citations.length + (body.citations.length === 1 ? " SOURCE" : " SOURCES");
     citationList.innerHTML = body.citations.length ? body.citations.map((c,i) => '<article class="citation-card"><div class="citation-card-head"><b>'+esc(c.title)+'</b><span>RANK SCORE '+Number(c.score).toFixed(3)+'</span></div><p>'+esc(c.text)+'</p><small>'+esc(c.source || c.document_id)+' · '+esc(c.chunk_id)+'</small></article>').join("") : '<p class="query-status">No supporting passage was found in the sample documents. Try a different question.</p>';
     answerPanel.hidden = false;
     setStatus(body.grounded ? "Search complete. Review the source evidence below." : "No matching evidence was found.");
   } catch (error) { setStatus(error.message || "The search could not be completed.", true); }
   finally { ask.disabled = false; ask.querySelector("span").textContent = "SEARCH"; }
 };
 document.querySelectorAll("[data-question]").forEach(button => button.addEventListener("click", () => { input.value = button.dataset.question; charCount.textContent = input.value.length + " / 1000"; runQuery(input.value); }));
 input.addEventListener("input", () => { charCount.textContent = input.value.length + " / 1000"; });
 input.addEventListener("keydown", event => { if ((event.metaKey || event.ctrlKey) && event.key === "Enter") { event.preventDefault(); runQuery(input.value); }});
 form.addEventListener("submit", event => { event.preventDefault(); runQuery(input.value); });
 loadDocuments();
})();