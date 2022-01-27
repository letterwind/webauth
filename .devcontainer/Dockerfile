# Note: You can use any Debian/Ubuntu based image you want.
# FROM mcr.microsoft.com/vscode/devcontainers/base:0-buster
FROM ubuntu:21.04

ARG NODE_VERSION="14.x"

# [Choice]Angular Cli version
ARG ANGULAR_CLI_VER="12.2.4"
# FROM willh/ngcli:${ANGULAR_CLI_VER}

# [Option] Install zsh
ARG INSTALL_ZSH="true"
# [Option] Upgrade OS packages to their latest versions
ARG UPGRADE_PACKAGES="true"
# [Option] Enable non-root Docker access in container
ARG ENABLE_NONROOT_DOCKER="false"
# [Option] Use the OSS Moby Engine instead of the licensed Docker Engine
ARG USE_MOBY="false"

# Install needed packages and setup non-root user. Use a separate RUN statement to add your
# own dependencies. A user of "automatic" attempts to reuse an user ID if one already exists.
ARG USERNAME=automatic
ARG USER_UID=1000
ARG USER_GID=$USER_UID
COPY library-scripts/*.sh /tmp/library-scripts/
RUN apt-get update \
    && /bin/bash /tmp/library-scripts/common-debian.sh "${INSTALL_ZSH}" "${USERNAME}" "${USER_UID}" "${USER_GID}" "${UPGRADE_PACKAGES}" "true" "true" \
    # Use Docker script from script library to set things up
    && /bin/bash /tmp/library-scripts/docker-in-docker-debian.sh "${ENABLE_NONROOT_DOCKER}" "${USERNAME}" "${USE_MOBY}" \
    #
    && /bin/bash /tmp/library-scripts/zsh-in-docker.sh \
    -t https://github.com/denysdovhan/spaceship-prompt \
    -a 'SPACESHIP_PROMPT_ADD_NEWLINE="false"' \
    -a 'SPACESHIP_PROMPT_SEPARATE_LINE="false"' \
    -p git \
    -p https://github.com/zsh-users/zsh-autosuggestions \
    -p https://github.com/zsh-users/zsh-completions \
    -p https://github.com/zsh-users/zsh-history-substring-search \
    -p https://github.com/zsh-users/zsh-syntax-highlighting \
    -p 'history-substring-search' \
    -a 'bindkey "\$terminfo[kcuu1]" history-substring-search-up' \
    -a 'bindkey "\$terminfo[kcud1]" history-substring-search-down' \
    # Clean up
    && apt-get autoremove -y && apt-get clean -y && rm -rf /var/lib/apt/lists/* /tmp/library-scripts/

RUN chsh -s /bin/zsh \
  && git clone https://github.com/caiogondim/bullet-train.zsh.git \
  && mv ./bullet-train.zsh/bullet-train.zsh-theme ~/.oh-my-zsh/themes \
  && sed -i -r 's/ZSH_THEME=.*/ZSH_THEME="bullet-train"/' ~/.zshrc

VOLUME [ "/var/lib/docker" ]

# [Optional] Uncomment this section to install additional OS packages.
# RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
#     && apt-get -y install --no-install-recommends apt-transport-https \
#   ca-certificates \
#   curl \
#   lxc \
#   iptables \
#   gnupg \
#   lsb-release \
#   net-tools

RUN curl -sL https://deb.nodesource.com/setup_${NODE_VERSION} | sudo -E bash -

RUN apt-get -y install nodejs


RUN npm init -y && npm i -g @angular/cli@${ANGULAR_CLI_VER}


# Setting the ENTRYPOINT to docker-init.sh will start up the Docker Engine
# inside the container "overrideCommand": false is set in devcontainer.json.
# The script will also execute CMD if you need to alter startup behaviors.
ENTRYPOINT [ "/usr/local/share/docker-init.sh" ]
CMD [ "sleep", "infinity" ]

EXPOSE 4200
