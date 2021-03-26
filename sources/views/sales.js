import {JetView} from "webix-jet";
import DataView from "views/datasales";
import SalesForm from "views/forms/saleform";
import {sales} from "models/sales";
export default class OrdersView extends JetView{
	config(){
		return {
			rows:[
				{
					view:"toolbar", css:"subbar", padding:0,
					elements:[
						{
							css:"title", height:50, borderless:true,
							template: `<div class='header'>Sales list</div>
								<div class='details'>( all Sales list )</div>`
						},
						{
							view:"button", type:"form",
							label:"Add New Sales", width:140,
							click:() => this.form.showForm()
						}
					]
				},
				{ $subview:DataView }
			]
		};
	}
	init(){
		this.form = this.ui(SalesForm);
		//this.form.addExtra({ view:"text", name:"quantity", label:"Quantity", labelWidth:100 }, 3);

		this.on(this.app,"sales:save", values => {
			values.id ? sales.updateItem(values.id,values) : sales.add(values);
		});

		this.on(this.app,"sales:delete", id => sales.remove(id));
	}
	ready(view){
		const grid = view.queryView({view:"datatable"});
		grid.sync(sales);
	}
}
