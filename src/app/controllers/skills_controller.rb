class SkillsController < ApplicationController
  before_action :logged_in_user, only: :create
  def create
    skill = Skill.new(skill_params)
    skill.save
    render json: skill, methods: [:image_url]
  end

  private
    def skill_params
      params.require(:skill).permit(:name, :image)
    end
end

module Api
  module V1
    class SkillsController < ApplicationController

      def api_index
        skills = Skill.all
        render json: skills, methods: [:image_url]
      end
      
      def api_show
        skill = Skill.find(params[:id])
        render json: skill, methods: [:image_url]
      end

    end
  end
end
