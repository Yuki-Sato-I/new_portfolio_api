class CreateWorks < ActiveRecord::Migration[6.0]
  def change
    create_table :works do |t|
      t.string :image
      t.string :title
      t.text :content
      t.string :url
      t.integer :status

      t.timestamps
    end
  end
end