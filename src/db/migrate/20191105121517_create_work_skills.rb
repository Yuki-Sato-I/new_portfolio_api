class CreateWorkSkills < ActiveRecord::Migration[6.0]
  def change
    create_table :work_skills do |t|
      t.references :skill, null: false, foreign_key: true
      t.references :work, null: false, foreign_key: true

      t.timestamps
    end
  end
end
