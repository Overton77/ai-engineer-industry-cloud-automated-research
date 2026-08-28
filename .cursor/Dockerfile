FROM node:24-bookworm

ARG DEBIAN_FRONTEND=noninteractive

ENV PIPX_HOME=/opt/pipx \
    PIPX_BIN_DIR=/usr/local/bin

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        ca-certificates \
        curl \
        git \
        jq \
        pipx \
        python3 \
        ripgrep \
        sudo \
    && curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg \
        | dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg \
    && chmod go+r /usr/share/keyrings/githubcli-archive-keyring.gpg \
    && echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" \
        > /etc/apt/sources.list.d/github-cli.list \
    && apt-get update \
    && apt-get install -y --no-install-recommends gh \
    && rm -rf /var/lib/apt/lists/*

# Pin every research CLI so a rebuilt Cursor environment is reproducible.
RUN npm install --global \
        agent-browser@0.35.1 \
        firecrawl-cli@1.23.3 \
    && pipx install tavily-cli==0.1.6 \
    && agent-browser install --with-deps \
    && agent-browser --version \
    && firecrawl --version \
    && tvly --version
