class CreateContasReceber < ActiveRecord::Migration
  def change
    create_table :contas_receber do |t|
      t.references :cliente
      t.date :vencimento
      t.float :valor

      t.timestamps
    end
    add_index :contas_receber, :cliente_id
  end
end
