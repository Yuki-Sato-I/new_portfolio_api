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
    #strong parameterでできないかな
    user.update(name: params[:name], en_name: params[:en_name],
                age: params[:age], profession: params[:profession],
                content: params[:content], service: params[:service])
    user.image.attach(params[:image]) if params[:image]
    render json: user, methods: [:image_url]
  end

  private
    def user_params
      params.require(:user).permit(:name, :image, :en_name, :age, :profession, :content, :service)
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