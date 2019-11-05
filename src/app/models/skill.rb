class Skill < ApplicationRecord
  has_many :work_skills
  has_many :work_skills, through: :works
end
