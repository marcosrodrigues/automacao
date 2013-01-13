class CreateVendaServicos < ActiveRecord::Migration
  def change
    create_table :venda_servicos do |t|
      t.references :venda
      t.references :servico
      t.integer :quantidade

      t.timestamps
    end
  end
end
