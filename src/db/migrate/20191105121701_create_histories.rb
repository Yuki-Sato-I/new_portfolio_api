class CreateHistories < ActiveRecord::Migration[6.0]
  def change
    create_table :histories do |t|
      t.string :title
      t.text :content
      t.string :period
      t.datetime :start_at
      t.datetime :end_at

      t.timestamps
    end
  end
end
