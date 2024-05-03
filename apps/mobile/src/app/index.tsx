import { useState } from 'react'
import { View, Image, StatusBar, Alert } from 'react-native'
import { Link, Redirect } from 'expo-router'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Input } from '@/components/input'
import { Button } from '@/components/button'
import { colors } from '@/styles/colors'
import { api } from '@/lib/api'
import { useBadgeStore } from '@/store/badge'

export default function Home() {
  const [code, setCode] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const badgeStore = useBadgeStore()

  async function handleAccessCredential() {
    if (!code.trim()) {
      return Alert.alert('Ingresso', 'Preencha o código do ingresso')
    }
    try {
      setIsLoading(true)
      const { data } = await api.get(`/attendees/${code.trim()}/badge`)
      badgeStore.save(data.badge)
    } catch (error) {
      setIsLoading(false)
      console.log(error)
      Alert.alert('Ingresso', 'Ingresso não encontrado.')
    }
  }
  if (badgeStore.data?.checkInUrl) {
    return <Redirect href="/ticket" />
  }

  return (
    <View className="flex-1 bg-green-500 justify-center items-center p-8">
      <StatusBar barStyle="light-content" />
      <Image
        source={require('@/assets/logo.png')}
        className="h-16"
        resizeMode="contain"
      />
      <View className="w-full mt-12 gap-3">
        <Input>
          <MaterialCommunityIcons
            name="ticket-confirmation-outline"
            size={20}
            color={colors.green[200]}
          />
          <Input.Field
            placeholder="Código do ingresso"
            onChangeText={setCode}
          />
        </Input>
        <Button
          title="Acessar credencial"
          onPress={handleAccessCredential}
          isLoading={isLoading}
        />
        <Link
          href="/register"
          className="text-gray-100 text-base font-bold text-center mt-8"
        >
          Ainda não possui ingresso?
        </Link>
      </View>
    </View>
  )
}
