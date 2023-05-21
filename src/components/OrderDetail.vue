<template>
  <div class="order-detail">
    <!-- display order details here -->
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect } from "vue";
import api from "@/api/api";

interface Props {
  orderId: string;
}

export default defineComponent({
  props: {
    orderId: {
      type: String,
      required: true,
    },
  },
  setup(props: Props) {
    const orderDetail = ref(null);

    const fetchOrderDetail = async (orderId: string) => {
      try {
        const response = await api.get(`/orders/${orderId}`);
        orderDetail.value = response.data;
      } catch (error) {
        // handle error
      }
    };

    watchEffect(() => {
      if (props.orderId) {
        fetchOrderDetail(props.orderId);
      }
    });

    return { orderDetail };
  },
});
</script>

<style scoped>
/* style for the order detail */
</style>
