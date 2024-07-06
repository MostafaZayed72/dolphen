<template>
    <v-card class="text-center bg-blue-grey-lighten-3">
        <v-tabs v-model="tab" bg-color="green-darken-3">
            <v-tab
                v-for="(item, index) in tabs"
                :key="index"
                class="mx-auto"
                :value="item.value"
            >
                {{ item.title }}
            </v-tab>
        </v-tabs>

        <v-card-text>
            <v-window v-model="tab">
                <v-window-item
                    v-for="(item, index) in tabs"
                    :key="index"
                    :value="item.value"
                >
                    <img :src=item.imgSrc :alt="item.title" class="tab-image rounded"/>
                    <h1>{{ item.details }}</h1>
                </v-window-item>
            </v-window>
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    data: () => ({
        tab: null,
        tabs: [
            {
                id: '1',
                title: 'العرض الاول',
                value: 'one',
                imgSrc: 'https://cdn.shopify.com/s/files/1/0330/1874/0876/files/2_a264cf61-82b2-4603-8bbc-6e831e227a0e.png?v=1660590562',
                details: 'تفاصيل العرض الاول',
            },
            {
                id: '2',
                title: 'العرض الثاني',
                value: 'two',
                imgSrc: 'https://cdn.shopify.com/s/files/1/0330/1874/0876/files/Artboard_30_copy_3_e55b4322-71b4-459a-b47b-d56e528c4a29.jpg?v=1683973140',
                details: 'تفاصيل العرض الثاني',
            },
        ],
    }),
}
</script>

<style>
.v-tab--selected {
    color: #eeea03;
}
.tab-image {
    width: 100%;
    max-width: 500px;
    height: auto;
    margin: 0 auto;
}
</style>
