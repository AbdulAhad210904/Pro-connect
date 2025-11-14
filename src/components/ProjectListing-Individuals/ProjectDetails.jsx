import Image from "next/image"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ProjectListing-Individuals/dialog"

export function ProjectDetails({ project, open, onOpenChange }) {
  console.log(project);
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Project titel</DialogTitle>
        </DialogHeader>
        <div className="flex items-center gap-2 mt-4">
          <Image
            src="/user.png"
            alt="User avatar"
            width={40}
            height={40}
            className="rounded-full"
          />
          <span className="text-sm text-gray-600">Individua: username</span>
        </div>
        <div className="space-y-4 mt-6">
          <div>
            <span className="font-semibold">Categorie: </span>
            <span>Schilderij</span>
          </div>
          <div>
            <span className="font-semibold">Locatie: </span>
            <span>New York, NY</span>
          </div>
          <div>
            <span className="font-semibold">Budget: </span>
            <span>$1000-$2000</span>
          </div>
          <div>
            <span className="font-semibold">Deadline: </span>
            <span>31-12-2024</span>
          </div>
          <div>
            <span className="font-semibold">Status: </span>
            <span>Nieuw</span>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Description:</h3>
            <p className="text-sm text-gray-600">
              the whole description on the project
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Images:</h3>
            <div className="grid grid-cols-3 gap-4">
              {Array(6).fill(null).map((_, index) => (
                <div key={index} className="relative aspect-square border rounded-lg overflow-hidden">
                  <Image
                    src="/ImagePlaceholder.png"
                    alt={`Project image ${index + 1}`}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
