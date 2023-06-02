<template>
  <div
    class="order-detail flex-grow p-4 bg-white shadow-lg rounded-lg m-4"
    v-if="order"
  >
    <h2 class="text-2xl font-bold mb-2">
      Order Detail - {{ formatOrderNumber(order.orderNumber) }}
    </h2>
    <h3 class="text-xl font-semibold mb-1">
      Source Type: {{ order.sourceType }}
    </h3>

    <h3 class="text-xl font-semibold mt-4 mb-1">Event Details</h3>
    <p class="mb-1">
      Delivery Time: {{ formatDate(order.event.deliveryTime) }}
    </p>
    <p class="mb-1">Address: {{ formatAddress(order.event.address) }}</p>
    <p class="mb-1">
      Contact: {{ order.event?.contact?.name ?? "Not available" }},
      {{ "phone: " + (order.event?.contact?.phone ?? "Not available") }}
    </p>

    <h3 class="text-xl font-semibold mt-4 mb-1">Customer</h3>
    <p class="mb-1">
      Customer: {{ order.contact.firstName || "N/A" }}
      {{ order.contact.lastName || "" }}
    </p>

    <h3 class="text-xl font-semibold mt-4 mb-1">Total</h3>
    <p class="mb-1">Sub Total: {{ order.totals.subTotal }}</p>
    <p class="mb-1">Caterer Total Due: {{ order.totals.catererTotalDue }}</p>
    <p class="mb-1">Tip: {{ order.totals.tip }}</p>
    <p class="mb-1">Delivery Fee: {{ order.totals.deliveryFee }}</p>
    <p class="mb-1">Commission: {{ order.totals.commission }}</p>

    <h3 class="text-xl font-semibold mt-4 mb-1">Items</h3>
    <ul class="list-disc list-inside">
      <li v-for="item in order.items" :key="item.name" class="mb-1">
        {{ item.quantity }} x {{ item.name }} - {{ item.cost }}
      </li>
    </ul>

    <h3 class="text-xl font-semibold mt-4 mb-1">Items Aggregate</h3>
    <ul class="list-disc list-inside">
      <li
        v-for="(quantity, name) in order.itemsAggregate"
        :key="name"
        class="mb-1"
      >
        {{ quantity }} x {{ name }}
      </li>
    </ul>

    <div class="flex space-x-4 mt-4">
      <div>
        <label for="status" class="block text-sm font-medium text-gray-700 mb-1"
          >Status</label
        >
        <select
          id="status"
          class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          v-model="order.status"
        >
          <option>New</option>
          <option>In Progress</option>
          <option>Complete</option>
          <option>Cancelled</option>
        </select>
      </div>

      <div class="pt-6">
        <button
          class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
          disabled
        >
          <span>Create Lead</span>
        </button>
        <span class="text-gray-500 text-xs italic">Coming Soon</span>
      </div>
    </div>
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

    watch(
      () => order.value?.status,
      async (newStatus, oldStatus) => {
        // if (newStatus !== oldStatus) {
        //   await api.put(`/orders/${props.orderId}`, { status: newStatus });
        // }
        return;
      }
    );

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
