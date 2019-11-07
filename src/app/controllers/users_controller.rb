class UsersController < ApplicationController
  def index
  end

  def new
  end

  def create

  end

  def show
    @user = User.find(params[:id])
    @works = Work.all
    @skills = Skill.all
    @histories = History.all
  end

  def edit
  end

  def update

  end

  def destroy
    
  end
end
