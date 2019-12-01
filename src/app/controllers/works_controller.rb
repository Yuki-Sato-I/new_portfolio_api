class WorksController < ApplicationController
  before_action :logged_in_user, only: [:create, :update, :show]
  def create
    work = Work.new(work_params)
    work.save
    render :json => work
  end

  def show
    work = Work.find(params[:id])
    render json: work, methods: :skills
  end

  def update
    work = Work.find(params[:id])
    work.update(work_params)
    work = Work.find(params[:id]) #ちょっとここいるかどうか検証必要
    render json: work
  end

  private
    def work_params
      params.require(:work).permit(:title, :image, :content, :reason, :appeal, :period, :url, :status, :release_at, {:skill_ids => []})
    end
end

module Api
  module V1
    class WorksController < ApplicationController

      def api_index
        works = Work.where.not(status: 0)
        render json: works
      end

      def api_show
        works = Work.find(params[:id])
        render json: works, methods: [:image_url]
      end

      def api_top
        topWorks = Work.where(status: 3)
        render json: topWorks
      end

    end
  end
end