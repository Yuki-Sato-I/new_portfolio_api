class CreateUsers < ActiveRecord::Migration[6.0]
  def change
    create_table :users do |t|
      t.string :image
      t.string :name
      t.string :en_name
      t.integer :age
      t.string :profession
      t.text :content
      t.text :service

      t.timestamps
    end
  end
end
