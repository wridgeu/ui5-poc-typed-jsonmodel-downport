import MessageBox from "sap/m/MessageBox";
import BaseController from "./BaseController";
import TypedJSONModel from "com/myorg/mymodule/TypedJSONModel";

// code yoinked from: https://github.com/UI5/typescript/blob/main/test-packages/typed-json-model/webapp/controller/App.controller.ts

type PurchaseOrderId = `PO-${string}`;
type PurchaseOrderType = "Purchase Order";

interface Order {
  approved: boolean;
  items: OrderItem[];
  order_id: string;
  type: string;
}

interface OrderItem {
  description: string;
  item_id: string;
  price: number;
  quantity: number;
}

interface PurchaseOrder extends Order {
  order_id: PurchaseOrderId;
  type: PurchaseOrderType;
}

/**
 * @namespace com.myorg.myapp.controller
 */
export default class Main extends BaseController {

	model: TypedJSONModel<{ order: PurchaseOrder }>;

	onInit(): void {
	  const order: PurchaseOrder = {
		order_id: "PO-2025-0042",
		type: "Purchase Order",
		approved: true,
		items: [
		  {
			item_id: "IT-0815",
			description: "Notebook",
			quantity: 1,
			price: 1000.0,
		  },
		],
	  };
	  this.model = new TypedJSONModel({ order: order });
	  this.getView()?.setModel(this.model);
	}

	public sayHello(): void {

		this.model.setProperty("/order/approved", false )
		// this.model.setProperty("/order/approved", "" ) //< err

		MessageBox.show("Hello World!");
	}
}
