class SkillsController < ApplicationController
  def index
  end

  def new

  end

  def create
    skill = Skill.new(skill_params)
    skill.save
    render :json => skill
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
    def skill_params
      params.require(:skill).permit(:name, :image)
    end
end
