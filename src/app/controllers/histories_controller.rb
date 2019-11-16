class HistoriesController < ApplicationController
  def index
  end

  def new

  end

  def create
    history = History.new(history_params)
    history.save
    render :json => history
  end

  def show
  end

  def edit
  end

  def update

  end

  def destroy
    
  end

  private
    def history_params
      params.require(:history).permit(:title, :image, :content, :start_at, :end_at)
    end
end
