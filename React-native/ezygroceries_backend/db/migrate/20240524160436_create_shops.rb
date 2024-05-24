class CreateShops < ActiveRecord::Migration[7.0]
  def change
    create_table :shops do |t|
      t.string :name
      t.string :web_url
      t.integer :gst_no
      t.boolean :is_verified , :default=>false
      t.text :description

      t.timestamps
    end
  end
end
