class WorksController < ApplicationController
  def index
  end

  def get

  end

  def new

  end

  def create

  end

  def show
    work = Work.find(params[:id])
    render json: work, methods: :skills
  end

  def edit
  end

  def update

  end

  def destroy
    
  end
end
