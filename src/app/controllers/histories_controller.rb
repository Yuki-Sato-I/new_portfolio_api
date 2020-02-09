class HistoriesController < ApplicationController
  before_action :logged_in_user, only: [:create, :update]
  def create
    history = History.new(history_params)
    history.save
    render :json => history
  end

  def update
    history = History.find(params[:id])
    history.update(title: params[:title], content: params[:content],
                   start_at: params[:start_at], end_at: params[:end_at])
    history.image.attach(params[:image]) if params[:image]
    render json: history, methods: [:image_url]
  end

  private
    def history_params
      params.require(:history).permit(:title, :image, :content, :start_at, :end_at)
    end

end

module Api
  module V1
    class HistoriesController < ApplicationController

      def api_index
        page = params[:page] ? params[:page].to_i : 1
        limit = params[:limit] ? params[:limit].to_i : 25
        offset = limit * (page - 1);

        histories = History.limit(limit).offset(offset).order(:start_at)

        render json: histories, methods: [:image_url]
      end

      def api_show
        history = History.find(params[:id])
        render json: history, methods: [:image_url]
      end

    end
  end
end
