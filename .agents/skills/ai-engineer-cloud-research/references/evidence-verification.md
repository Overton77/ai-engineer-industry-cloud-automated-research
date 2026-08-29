# Evidence and verification

Normalize the URL, record publisher and source type, fetch content, compute SHA-256 over the exact stored bytes, upload to the private bucket, then register `evidence.source` and immutable `evidence.source_capture`. Preserve publication/event date separately from retrieval time.

Every claim needs the narrowest reproducible locator: page and bounding box for PDFs, heading plus offsets for HTML/Markdown, line range for code, timestamp range for video/transcript, or JSON Pointer for APIs. A short excerpt is only a verification aid; the capture and locator are authoritative.

The verifier must be a different attempt from the extractor. It retrieves the registered capture, applies the locator, and records support, contradiction, partial support, or unverifiable. Quantitative facts additionally verify units, window, canonical entity identifier, provider timestamp, and estimate status.

Fail closed when the source is missing, the locator does not resolve, the capture hash differs, identity is ambiguous, the value came from a search score, or a time-sensitive claim lacks an as-of date. Record the unavailable reason; never substitute zero.
