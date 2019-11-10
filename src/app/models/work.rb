class Work < ApplicationRecord
  has_many :work_skills
  has_many :skills, through: :work_skills
end
