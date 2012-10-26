class CreateVendas < ActiveRecord::Migration
  def change
    create_table :vendas do |t|
      t.references :cliente

      t.timestamps
    end
    add_index :vendas, :cliente_id
  end
end
