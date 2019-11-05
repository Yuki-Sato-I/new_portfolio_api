class Work < ApplicationRecord
  has_many :work_skills
  has_many :work_skills, through: :skills
end
