<script setup>
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

onMounted(() => {
  const route = useRoute()
  const router = useRouter()
  const { params, query } = route
  const { path } = params
  router.replace({ path: `/${path}`, query })
})
</script>
