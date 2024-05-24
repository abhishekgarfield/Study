class CreateCustomers < ActiveRecord::Migration[7.0]
  def change
    create_table :customers do |t|
      t.string :first_name
      t.string :last_name
      t.string :password
      t.date :dob
      t.integer :phone_no
      t.string :city
      t.string :landmark
      t.text :address
      t.string :email
      t.boolean :is_verified
      t.references :role, null: false, foreign_key: true, :default=>4

      t.timestamps
    end
  end
end
