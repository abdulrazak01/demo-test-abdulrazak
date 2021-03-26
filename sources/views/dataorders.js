import {JetView} from "webix-jet";

export default class DataView extends JetView {
	config() {
		return {
			view:"datatable",
			select:true,
			scroll:"y",
			columns:[
				{ id:"edit", header:"", width:35, template:"{common.editIcon()}" },
				{ id:"delete", header:"", width:35, template:"{common.trashIcon()}" },
				{ id:"id_pembelian", header:["id_pembelian", {content:"textFilter"} ], sort:"text" },
				{ id:"id_karyawan", header:["id_karyawan", {content:"textFilter"} ], sort:"text", fillspace:true, minWidth:150 },
				{ id:"id_sup", header:["id_suplier", {content:"textFilter"} ], sort:"text" },
				{ id:"id_barang", header:["id_barang", {content:"textFilter"} ], sort:"text" },
				{ id:"nama_barang", header:["nama_barang", {content:"textFilter"} ], sort:"text" },
				{ id:"tanggal", header:["tanggal_pembelian", {content:"textFilter"} ], sort:"text" },
				{ id:"harga", header:"harga", sort:"int"},
				{ id:"jumlah", header:"jumlah", sort:"int"},
				{ id:"total_harga", header:"total_harga", sort:"int"}
			],
			onClick:{
				"wxi-trash":(e, id) => {
					webix.confirm({
						text:"The order will be deleted. <br/> Are you sure?",
						ok:"Yes", cancel:"Cancel",
						callback: res => {
							if (res)
								this.app.callEvent("orders:delete",[id.row]);
						}
					});
				},
				"wxi-pencil":(e, id) => {
					//show form
					const item = this.getRoot().getItem(id);
					this.app.callEvent("form:fill", [item]);
				}
			}
		};
	}
}
