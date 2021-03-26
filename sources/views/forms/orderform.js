import {JetView} from "webix-jet";

export default class OrderForm extends JetView{
	config(){
		return {
			view:"window", head:false, position:"center",
			modal:true, body:{
				view:"form",
				paddingY:20, paddingX:30,
				width:500,
				elementsConfig:{ labelWidth:100 },
				elements:[
					
					{ view:"text", name:"id_pembelian", label:"id_pembelian" },
					{ view:"text", name:"id_karyawan", label:"id_karyawan"},
					{ view:"combo", name:"id_sup", label:"id_suplier", options:["SUP01", "SUP02", "SUP03", "SUP04"]},
					{ view:"combo", name:"id_barang", label:"id_barang",options:["BAR01", "BAR02", "BAR03", "BAR04"]},
					{ view:"text", name:"nama_barang", label:"nama_barang"},
					{ view:"datepicker",name:"tanggal", label:"tanggal"},
					{ view:"text", name:"harga", label:"harga"},
					{ view:"text", name:"jumlah", label:"jumlah"},
					{ view:"text", name:"total_harga", label:"total_harga" },
					{
						margin:10,
						cols:[
							{},
							{
								view:"button", value:"<< Back",
								align:"center", width:120,
								click:() => this.hideForm()
							},
							{
								view:"button", value:"Save", type:"form",
								align:"center", width:120,
								click:() => {
									if (this.form.validate()) {
										this.app.callEvent("orders:save", [this.form.getValues()]);
										this.hideForm();
									}
								}
							}
						]
					}
				],
				rules:{
					$all:webix.rules.isNotEmpty
				}
			}
		};
	}
	init(view){
		this.form = view.getBody();

		this.on(this.app, "form:fill", values => {
			view.show();
			this.form.setValues(values);
		});
	}
	
	showForm(){
		this.getRoot().show();
	}
	hideForm(){
		this.getRoot().hide();
		this.form.clear();
		this.form.clearValidation();
	}
}
