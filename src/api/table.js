import requests from '@/utils/requests'

export const getTableDefaultList = () => requests.get('table/default/list')
