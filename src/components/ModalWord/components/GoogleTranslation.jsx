import { useFetch } from "../../../hooks/useFetch";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { saveTranslation } from "../utils/crud-firefox";
import { useToast } from "@/hooks/use-toast"


export const GoogleTranslation = ({ modalVisible, setModalVisible, word, videoId }) => {

  const language = "es"
  const url = `${import.meta.env.VITE_URL_SERVER}/api/google?word=${word}&language=${language}`;

  const { data, loading, error } = useFetch({ word, url });
  const { toast } = useToast()


  const handleSaveItem = () => {
    if (!data) return

    const payload = {
      videoId,
      titleVideo: "Agregar titulo",
      original: word,
      translated: data,
      language: "es",
      createdAt: new Date()
    }

    saveTranslation(payload)

    const toastContent = () => (
      < div id="toast-content" style={{ width: "100vw", display: "flex", flexDirection: "row", justifyContent: "space-evenly" }}>
        <p> Traducción guardada</p> <span>✔️ </span>
      </div>
    )
    toast({
      title: toastContent(),
    })
    setModalVisible(false)
  }


  return (
    <Drawer open={modalVisible} onOpenChange={setModalVisible}>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>{loading ? <Skeleton className="h-3 w-[90%]" /> : word}</DrawerTitle>
            <Separator />
            <DrawerDescription>
              {loading ? <Skeleton className="h-3 w-[90%]" /> : data}
              {error && <p>{error}</p>}
            </DrawerDescription>
          </DrawerHeader>



          <DrawerFooter>
            <Button
              variant="outline"
              className="h-[40px]"
              onClick={handleSaveItem}
            >
              Save
            </Button>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )

}