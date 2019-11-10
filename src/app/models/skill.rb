class Skill < ApplicationRecord
  has_many :work_skills
  has_many :works, through: :work_skills
end
