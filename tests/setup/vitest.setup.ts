// Allow integration tests to call local services presenting self-signed TLS certificates.
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
