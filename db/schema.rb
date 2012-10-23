# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20121023154337) do

  create_table "clientes", :force => true do |t|
    t.string   "nome"
    t.string   "telefone"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "contas_pagar", :force => true do |t|
    t.integer  "fornecedor_id"
    t.date     "vencimento"
    t.float    "valor"
    t.datetime "created_at",    :null => false
    t.datetime "updated_at",    :null => false
  end

  add_index "contas_pagar", ["fornecedor_id"], :name => "index_contas_pagar_on_fornecedor_id"

  create_table "contas_receber", :force => true do |t|
    t.integer  "cliente_id"
    t.date     "vencimento"
    t.float    "valor"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  add_index "contas_receber", ["cliente_id"], :name => "index_contas_receber_on_cliente_id"

  create_table "fornecedores", :force => true do |t|
    t.string   "nome"
    t.string   "telefone"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "produtos", :force => true do |t|
    t.integer  "tipo_produto_id"
    t.string   "descricao"
    t.string   "codigo_barras"
    t.float    "preco_venda"
    t.datetime "created_at",      :null => false
    t.datetime "updated_at",      :null => false
  end

  add_index "produtos", ["tipo_produto_id"], :name => "index_produtos_on_tipo_produto_id"

  create_table "tipos_produto", :force => true do |t|
    t.string   "descricao"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

end
