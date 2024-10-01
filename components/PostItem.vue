<template>
    <tr class="bg-white border-b dark:border-gray-700">
        <th scope="row" class="md:px-6 md:py-4 px-2 py-1 font-medium text-gray-900 whitespace-nowrap capitalize">
            {{ post.platform }}
        </th>
        <td class="md:px-6 md:py-4 px-2 py-1">
            {{ post.username }}
        </td>
        <td :title="post.contentText" class="md:px-6 md:py-4 px-2 py-1 line-clamp-1 cursor-progress break-all">
            {{ post.contentText }}
        </td>
        <td class="md:px-6 md:py-4 px-2 py-1">
            {{ post.likesCount || '-' }}
        </td>
        <td class="md:px-6 md:py-4 px-2 py-1">
            {{ post.shareCount || '-' }}
        </td>
        <td class="md:px-6 md:py-4 px-2 py-1">
            {{ new Date(post.createdDate).toLocaleString('tr-TR') }}
        </td>
        <!-- <td class="px-6 py-4 text-right">
                            <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">View
                                Detail</a>
                        </td> -->
    </tr>
</template>

<script setup>
const { post } = defineProps(['post'])
</script>