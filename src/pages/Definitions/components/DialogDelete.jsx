import { deleteWord } from "@/components/TextSelectionHandler/components/utils/word-crud-firefox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"


const DialogDelete = (
  { dialogVisible,
    setDialogVisible,
    setDefinitions,
    setModalVisible,
    idDocument,
    word,
    definitions
  }

) => {

  const handleDelete = () => {
    console.log(`${idDocument} eliminado`)
    deleteWord(idDocument)
    const definitionsFiltered = definitions.filter((def) => def.idDocument !== idDocument)
    setDefinitions(definitionsFiltered)
    setModalVisible(false)
  }
  return (
    <Dialog open={dialogVisible} onOpenChange={setDialogVisible}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{`Are you sure you want to delete "${word}"?`}</DialogTitle>
          <DialogDescription>
            You won't be able to get it back
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button
            type="submit"
            onClick={handleDelete}
          >
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default DialogDelete