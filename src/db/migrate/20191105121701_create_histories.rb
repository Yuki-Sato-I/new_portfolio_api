class CreateHistories < ActiveRecord::Migration[6.0]
  def change
    create_table :histories do |t|
      t.string :image
      t.string :title
      t.text :content
      t.string :period

      t.timestamps
    end
  end
end
