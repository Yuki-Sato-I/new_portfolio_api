class Skill < ApplicationRecord
  include Rails.application.routes.url_helpers
  has_many :work_skills
  has_many :works, through: :work_skills
  has_one_attached :image

  def image_url
    image.attached? ? url_for(image) : nil
  end
end
