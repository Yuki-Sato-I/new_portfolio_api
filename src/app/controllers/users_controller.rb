class UsersController < ApplicationController
  before_action :logged_in_user, only: [:show, :update]
  def show
    @user = User.find(params[:id])
    gon.user = @user
    @works = Work.all
    @work = Work.find(1)
    @skills = Skill.all
    @histories = History.all.order(:start_at)
  end

  def update
    user = User.find(params[:id])
    user.update(user_params)
    user = User.find(params[:id]) #ちょっとここいるかどうか検証必要
    render json: user
  end

  private
    def user_params
      params.require(:user).permit(:name, :en_name, :age, :profession, :content, :service, :image)
    end

end

module Api
  module V1
    class UsersController < ApplicationController

      def api_show
        user = User.find(params[:id])
        render json: user, methods: [:image_url]
      end

    end
  end
end