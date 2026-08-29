FROM node:24-bookworm

ARG DEBIAN_FRONTEND=noninteractive

ENV PIPX_HOME=/opt/pipx \
    PIPX_BIN_DIR=/usr/local/bin

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        ca-certificates \
        curl \
        ffmpeg \
        git \
        jq \
        pipx \
        poppler-utils \
        postgresql-client \
        python3 \
        python3-venv \
        ripgrep \
        sudo \
        unzip \
    && rm -rf /var/lib/apt/lists/*

# Pin every research CLI so a rebuilt Cursor environment is reproducible.
RUN npm install --global \
        agent-browser@0.35.1 \
        firecrawl-cli@1.23.3 \
    && pipx install tavily-cli==0.1.6 \
    && agent-browser install --with-deps \
    && agent-browser --version \
    && firecrawl --version \
    && tvly --version \
    && ffmpeg -version \
    && pdftotext -v \
    && psql --version
