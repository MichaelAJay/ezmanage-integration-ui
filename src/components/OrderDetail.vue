<template>
  <div class="order-detail flex-grow p-4" v-if="order">
    <h2>Order Detail - #{{ formatOrderNumber(order.orderNumber) }}</h2>
    <h3>Source Type: {{ order.sourceType }}</h3>

    <h3>Event Details</h3>
    <p>Delivery Time: {{ formatDate(order.event.deliveryTime) }}</p>
    <p>Address: {{ formatAddress(order.event.address) }}</p>
    <p>
      Contact: {{ order.event?.contact?.name ?? "Not available" }},
      {{ "phone: " + (order.event?.contact?.phone ?? "Not available") }}
    </p>

    <h3>Customer</h3>
    <p>
      Customer: {{ order.contact.firstName || "N/A" }}
      {{ order.contact.lastName || "" }}
    </p>

    <h3>Total</h3>
    <p>Sub Total: {{ order.totals.subTotal }}</p>
    <p>Caterer Total Due: {{ order.totals.catererTotalDue }}</p>
    <p>Tip: {{ order.totals.tip }}</p>
    <p>Delivery Fee: {{ order.totals.deliveryFee }}</p>
    <p>Commission: {{ order.totals.commission }}</p>

    <h3>Items</h3>
    <ul>
      <li v-for="item in order.items" :key="item.name">
        {{ item.quantity }} x {{ item.name }} - {{ item.cost }}
      </li>
    </ul>

    <h3>Items Aggregate</h3>
    <ul>
      <li v-for="(quantity, name) in order.itemsAggregate" :key="name">
        {{ quantity }} x {{ name }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from "vue";
import api from "@/api/api";
import { IOrder } from "./interfaces";

export default defineComponent({
  name: "OrderDetail",
  props: {
    orderId: String,
  },
  setup(props) {
    const order = ref<IOrder | null>(null);

    const fetchOrder = async () => {
      const response = await api.get(`/orders/${props.orderId}`);
      order.value = response.data;
    };

    onMounted(fetchOrder);

    watch(() => props.orderId, fetchOrder);

    const formatOrderNumber = (number: string) => {
      return `#${number.slice(0, 3)} ${number.slice(3)}`;
    };

    const formatDate = (dateString: string) => {
      const date = new Date(dateString);
      return date.toLocaleString();
    };

    const formatAddress = (address: IOrder["event"]["address"]) => {
      if (!address) {
        return "Not available";
      }
      return `${address.name}, ${address.street}, ${address.city}, ${address.state}, ${address.zip}`;
    };

    return { order, formatOrderNumber, formatDate, formatAddress };
  },
});
</script>

<style scoped>
.order-detail {
  width: 80%;
}
</style>
