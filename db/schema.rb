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

ActiveRecord::Schema.define(:version => 20121025003332) do

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

  create_table "precos_produto", :force => true do |t|
    t.integer  "produto_id"
    t.date     "data"
    t.float    "preco"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  add_index "precos_produto", ["produto_id"], :name => "index_precos_produto_on_produto_id"

  create_table "produtos", :force => true do |t|
    t.integer  "tipo_produto_id"
    t.string   "descricao"
    t.string   "codigo_barras"
    t.datetime "created_at",      :null => false
    t.datetime "updated_at",      :null => false
  end

  add_index "produtos", ["tipo_produto_id"], :name => "index_produtos_on_tipo_produto_id"

  create_table "tipos_produto", :force => true do |t|
    t.string   "descricao"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "users", :force => true do |t|
    t.string   "email",                                 :default => "",    :null => false
    t.string   "encrypted_password",     :limit => 128, :default => "",    :null => false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",                         :default => 0
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.datetime "created_at",                                               :null => false
    t.datetime "updated_at",                                               :null => false
    t.boolean  "admin",                                 :default => false
  end

  add_index "users", ["email"], :name => "index_users_on_email", :unique => true
  add_index "users", ["reset_password_token"], :name => "index_users_on_reset_password_token", :unique => true

end
