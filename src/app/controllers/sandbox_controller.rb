class SandboxController < ApplicationController
  def index
    @greeting = "Hi!!!!"
  end

  def send(params)
    logger.debug params.to_yaml
  end

end