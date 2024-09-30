<template>
    <div class="bg-gray-50">
        <div class="bg-gray-50">
            <div class="flex items-center justify-between px-10 py-6">
                <div class="flex flex-col space-y-4">
                    <div class="flex items-center justify-start space-x-2">
                        <Icon name="material-symbols:arrow-left-alt-rounded" size="20" />
                        <span class="block text-start"> Products </span>
                    </div>
                    <div class="flex space-x-4 items-center justify-center">
                        <div class="bg-gray-200 w-10 h-12 items-center justify-center flex md:block">
                            <img src="https://react-material.fusetheme.com/assets/images/apps/ecommerce/braies-lake.jpg"
                                alt="">
                        </div>
                        <div>
                            <h2 class="font-bold text-3xl">Lorem ipsum dolor sit.</h2>
                            <h3 class="text-gray-500 text-sm">Product Detail</h3>
                        </div>
                    </div>
                </div>
                <div class="flex items-center justify-center space-x-4">
                    <button
                        class="flex justify-center items-center space-x-2 text-white bg-[#4f46e5] py-2 px-4 rounded-full shadow-md">
                        <Icon name="bi:trash" size="16" />
                        <span>Remove</span>
                    </button>
                    <button
                        class="py-2 px-4 flex justify-center items-center text-white rounded-full bg-[#4f46e5] shadow-md">
                        <span>
                            Save
                        </span>
                    </button>
                </div>
            </div>
            <div class="bg-white h-full w-full overflow-x-auto">
                <div class="w-full relative">
                    <ul id="menu" class="flex justify-start items-center pr-10 text-gray-500 capitalize gap-12">
                        <li v-for="menuItem in menuItems" :key="menuItem.id"
                            :class="{ 'py-5 px-5 cursor-pointer font-medium': true, 'selected': menuItem.id === selectedMenu }"
                            @click="selectMenuItem(menuItem.id)">
                            <span class="whitespace-nowrap">
                                {{ menuItem.label }}
                            </span>
                        </li>
                    </ul>
                    <span class="bg-blue-700 transform duration-300 ease-in-out h-[2rem] absolute"
                        :class="`active-subline${selectedMenu}`">
                    </span>
                    <hr class="h-0.5">
                </div>
            </div>
            <div class="bg-white p-5">
                <div v-if="selectedMenu === 1" class="space-y-3">
                    <div class="flex flex-col">
                        <label class="pb-2">Name</label>
                        <input class="px-3 py-2 border lg:w-1/2 w-full rounded-md" type="text"
                            placeholder="Product Name" />
                    </div>
                    <div class="flex flex-col">
                        <label class="pb-2">Description</label>
                        <textarea class="px-3 py-2 border lg:w-1/2 w-full outline-none rounded-md h-24" type="text"
                            placeholder="Product Description" />
                    </div>
                    <div class="flex flex-col">
                        <label class="pb-2">Name</label>
                        <input class="px-3 py-2 border lg:w-1/2 w-full rounded-md" type="text" />
                    </div>
                    <div class="flex flex-col">
                        <label class="pb-2">Name</label>
                        <input class="px-3 py-2 border lg:w-1/2 w-full rounded-md" type="text" />
                    </div>
                </div>
                <div v-if="selectedMenu === 2" class="lg:w-1/2 w-full space-y-3">
                    <div class="grid grid-cols-2 lg:grid-cols-4 md:grid-cols-4 gap-3">
                        <label for="file-upload">
                            <div
                                class="h-32 w-32 relative justify-center flex items-center rounded-xl border cursor-pointer">

                                <Icon name="tabler:upload" size="28" color="gray" />
                                <input id="file-upload" name="file-upload" type="file" class="sr-only" />
                            </div>
                        </label>

                        <div v-for="(image, index) in images" :key="index"
                            class="h-32 w-32 relative rounded-xl overflow-hidden cursor-pointer"
                            :class="image.isSelected ? 'shadow-3xl border' : 'shadow-sm border-none'"
                            @click="setMainPhoto(index, images)">
                            <Icon v-if="image.isSelected" class="absolute top-0 right-0" name="ic:outline-star"
                                size="22" color="orange" />
                            <img :src="image.link" />
                        </div>
                    </div>
                </div>
                <div v-if="selectedMenu === 3" class="space-y-3">
                    <div class="flex flex-col">
                        <label class="pb-2">Tax Excluded Price</label>
                        <input class="px-3 py-2 border lg:w-1/2 w-full rounded-md" type="text"
                            placeholder="Tax Excluded Price" />
                    </div>
                    <div class="flex flex-col">
                        <label class="pb-2">Tax Included Price</label>
                        <input class="px-3 py-2 border lg:w-1/2 w-full rounded-md" type="text"
                            placeholder="Tax Included Price" />
                    </div>
                    <div class="flex flex-col">
                        <label class="pb-2">Tax Rate</label>
                        <input class="px-3 py-2 border lg:w-1/2 w-full rounded-md" type="text" placeholder="Tax Rate" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const selectedMenu = ref(1);
const menuItems = ref([
    { id: 1, label: 'Basic Info' },
    { id: 2, label: 'Product Image' },
    { id: 3, label: 'Pricing' },
    { id: 4, label: 'Inventory' },
    { id: 5, label: 'Shipping' }
])

const images = ref([
    { id: 0, link: 'https://react-material.fusetheme.com/assets/images/apps/ecommerce/a-walk-amongst-friends.jpg', isSelected: true },
    { id: 1, link: 'https://react-material.fusetheme.com/assets/images/apps/ecommerce/fall-glow.jpg', isSelected: false },
    { id: 2, link: 'https://react-material.fusetheme.com/assets/images/apps/ecommerce/yosemite.jpg', isSelected: false },
    { id: 3, link: 'https://react-material.fusetheme.com/assets/images/apps/ecommerce/first-snow.jpg', isSelected: false },
    { id: 4, link: 'https://react-material.fusetheme.com/assets/images/apps/ecommerce/morain-lake.jpg', isSelected: false },
]);

function setMainPhoto(index, images) {
    images.forEach((image) => {
        if (image.id === index) {
            image.isSelected = true
        }
        else {
            image.isSelected = false
        }
    });
}

const selectMenuItem = (selected) => {
    selectedMenu.value = selected
}

</script>

<style scoped>
.selected {
    color: #4F46E5;
}

.active-subline1 {
    width: 110px;
    left: 0;
}

.active-subline2 {
    width: 145.92px;
    left: 158px;
}

.active-subline3 {
    width: 90px;
    left: 350px;
}

.active-subline4 {
    width: 107px;
    left: 489px;
}

.active-subline5 {
    width: 103px;
    left: 645px;
}
</style>