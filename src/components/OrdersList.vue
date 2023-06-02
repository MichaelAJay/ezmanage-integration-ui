<template>
  <div class="flex flex-row w-full h-full overflow-hidden">
    <div
      class="w-1/10 overflow-y-auto scrollbar-w-2 scrollbar-track-gray-lighter scrollbar-thumb-rounded scrollbar-thumb-gray scrolling-touch"
    >
      <div
        v-for="order in orders"
        :key="order.id"
        @click="selectOrder(order.id)"
        class="cursor-pointer px-4 py-2 hover:bg-gray-100"
      >
        {{ formatOrderName(order.name) }}
      </div>
    </div>
    <div class="w-9/10 overflow-y-auto">
      <OrderDetail v-if="selectedOrderId" :orderId="selectedOrderId" />
    </div>
  </div>
</template>

<script lang="ts">
import { ref, onMounted, defineComponent } from "vue";
import OrderDetail from "./OrderDetail.vue";
import api from "@/api/api";

export default defineComponent({
  components: {
    OrderDetail,
  },
  setup() {
    const orders = ref<{ id: string; name: string }[]>([]);
    const selectedOrderId = ref<string | null>(null);

    const fetchOrders = async () => {
      try {
        const response = await api.get("/orders");

        orders.value = response.data;
      } catch (err) {
        // handle error
        console.error("err", err);
        throw err;
      }
    };

    const selectOrder = (orderId: string) => {
      selectedOrderId.value = orderId;
    };

    const formatOrderName = (name: string) => {
      return `#${name.slice(0, 3)} ${name.slice(3)}`;
    };

    onMounted(fetchOrders);

    return { orders, selectOrder, selectedOrderId, formatOrderName };
  },
});
</script>

<style scoped>
.flex {
  display: flex;
  flex-direction: row;
}
</style>
