<template>
  <div class="orders-page">
    <div class="orders-list">
      <!-- <a-list
        v-for="order in orders"
        :key="order.id"
        @click="selectOrder(order.id)"
      >
        {{ order.name }}
      </a-list> -->
      <List :dataSource="orders" @click="selectOrder">
        <template #default="{ item }">
          <a-list-item :key="item.id" :onClick="() => selectOrder(item.id)">
            {{ item.name }}
          </a-list-item>
        </template>
      </List>
    </div>
    <OrderDetail v-if="selectedOrderId" :orderId="selectedOrderId" />
  </div>
</template>

<script lang="ts">
import { ref, onMounted, defineComponent } from "vue";
import OrderDetail from "./OrderDetail.vue";
import api from "@/api/api";
import { List } from "ant-design-vue";

export default defineComponent({
  components: {
    List,
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

    onMounted(fetchOrders);

    return { orders, selectOrder, selectedOrderId };
  },
});
</script>

<style scoped>
.orders-page {
  display: flex;
}
.orders-list {
  width: 20%;
  /* additional styling for the list */
  overflow-y: auto;
}
</style>
