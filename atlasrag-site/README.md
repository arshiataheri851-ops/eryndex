# AtlasRAG standalone website

A standalone static product site for AtlasRAG.

## Preview
Open `index.html` in a browser or serve this directory with any static web server.

## Deployment
Deploy this directory (`atlasrag-site/`) as the publish root of a static-site service. Configure a dedicated hostname such as `atlasrag.eryndex.net` after DNS and hosting are set up.

## Demo behavior
The query playground is explicitly a local illustrative preview. It does not call the production API and does not claim to return live retrieval results. Connect it to the verified API endpoint only after the backend deployment and CORS configuration are confirmed.

## Current implementation claims
The page describes the repository's current lexical retrieval implementation: PostgreSQL full-text search, tenant-scoped API access, API-key authentication, citations/passages, Persian/Arabic normalization, and retrieval evaluation. It does not claim vector search, hybrid retrieval, or LLM answer generation.
