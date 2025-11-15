import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ShoppingCart, Plus, Minus, Trash2, Coffee } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { OrderCheckout } from "./OrderCheckout";

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: "coffee" | "food";
  image?: string;
}

export interface CartItem extends MenuItem {
  quantity: number;
}

const menuItems: MenuItem[] = [
  {
    id: "1",
    name: "Espresso",
    description: "Rich and bold single shot",
    price: 120,
    category: "coffee",
    image: "https://images.unsplash.com/photo-1579992357154-faf4bde95b3d?w=400"
  },
  {
    id: "2",
    name: "Cappuccino",
    description: "Espresso with steamed milk and foam",
    price: 150,
    category: "coffee",
    image: "https://images.unsplash.com/photo-1534778101976-62847782c213?w=400"
  },
  {
    id: "3",
    name: "Latte",
    description: "Smooth espresso with steamed milk",
    price: 160,
    category: "coffee",
    image: "https://images.unsplash.com/photo-1561882468-9110e03e0f78?w=400"
  },
  {
    id: "4",
    name: "Americano",
    description: "Espresso with hot water",
    price: 130,
    category: "coffee",
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400"
  },
  {
    id: "5",
    name: "Mocha",
    description: "Espresso, chocolate, and steamed milk",
    price: 175,
    category: "coffee",
    image: "https://images.unsplash.com/photo-1607681034540-2c46cc71896d?w=400"
  },
  {
    id: "6",
    name: "Cold Brew",
    description: "Smooth, cold-steeped coffee",
    price: 145,
    category: "coffee",
    image: "https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=400"
  },
  {
    id: "7",
    name: "Croissant",
    description: "Buttery, flaky French pastry",
    price: 120,
    category: "food",
    image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400"
  },
  {
    id: "8",
    name: "Blueberry Muffin",
    description: "Fresh baked with plump blueberries",
    price: 130,
    category: "food",
    image: "https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=400"
  },
  {
    id: "9",
    name: "Avocado Toast",
    description: "Smashed avocado on sourdough",
    price: 280,
    category: "food",
    image: "https://images.unsplash.com/photo-1588137378633-dea1336ce1e2?w=400"
  },
  {
    id: "10",
    name: "Bagel & Cream Cheese",
    description: "Fresh bagel with cream cheese",
    price: 150,
    category: "food",
    image: "https://images.unsplash.com/photo-1612224736169-2850b2e11aa0?w=400"
  },
  {
    id: "11",
    name: "Chocolate Chip Cookie",
    description: "Warm and gooey homemade cookie",
    price: 85,
    category: "food",
    image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400"
  },
  {
    id: "12",
    name: "Greek Yogurt Parfait",
    description: "Yogurt, granola, and fresh berries",
    price: 220,
    category: "food",
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400"
  },
];

export function Order() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);

  const addToCart = (item: MenuItem) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart(prevCart => prevCart.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId: string, change: number) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === itemId
          ? { ...item, quantity: Math.max(0, item.quantity + change) }
          : item
      ).filter(item => item.quantity > 0)
    );
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckout = () => {
    setShowCheckout(true);
    setIsCartOpen(false);
  };

  const handleOrderComplete = () => {
    setCart([]);
    setShowCheckout(false);
  };

  if (showCheckout) {
    return <OrderCheckout cart={cart} onBack={() => setShowCheckout(false)} onComplete={handleOrderComplete} />;
  }

  return (
    <section className="py-20 px-4 bg-muted min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="mb-2 text-primary">Order Online</h1>
            <p className="text-muted-foreground">Pick your favorites and we'll have them ready for you</p>
          </div>
          
          <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
            <SheetTrigger asChild>
              <Button size="lg" className="relative bg-accent hover:bg-accent/90">
                <ShoppingCart className="w-5 h-5 mr-2" />
                Cart
                {cartItemCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-primary h-6 w-6 rounded-full p-0 flex items-center justify-center">
                    {cartItemCount}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-lg">
              <SheetHeader>
                <SheetTitle>Your Cart</SheetTitle>
                <SheetDescription>
                  {cartItemCount === 0 ? "Your cart is empty" : `${cartItemCount} item${cartItemCount !== 1 ? 's' : ''} in cart`}
                </SheetDescription>
              </SheetHeader>
              
              <div className="mt-8 space-y-4">
                {cart.map(item => (
                  <Card key={item.id}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                          <h4 className="mb-1">{item.name}</h4>
                          <p className="text-muted-foreground">₱{item.price.toFixed(2)} each</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, -1)}
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, 1)}
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                        <span className="text-primary">₱{(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {cart.length > 0 && (
                <div className="mt-8 space-y-4">
                  <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
                    <span>Total</span>
                    <span className="text-primary">₱{cartTotal.toFixed(2)}</span>
                  </div>
                  <Button 
                    className="w-full bg-primary hover:bg-primary/90" 
                    size="lg"
                    onClick={handleCheckout}
                  >
                    Checkout
                  </Button>
                </div>
              )}
            </SheetContent>
          </Sheet>
        </div>

        <Tabs defaultValue="coffee" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
            <TabsTrigger value="coffee">Coffee</TabsTrigger>
            <TabsTrigger value="food">Food</TabsTrigger>
          </TabsList>
          
          <TabsContent value="coffee">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {menuItems.filter(item => item.category === "coffee").map(item => (
                <Card key={item.id} className="overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="relative h-48">
                    <ImageWithFallback
                      src={item.image || ""}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle>{item.name}</CardTitle>
                      <Badge variant="secondary" className="bg-accent text-white">
                        ₱{item.price.toFixed(2)}
                      </Badge>
                    </div>
                    <CardDescription>{item.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button 
                      className="w-full bg-primary hover:bg-primary/90" 
                      onClick={() => addToCart(item)}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add to Cart
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="food">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {menuItems.filter(item => item.category === "food").map(item => (
                <Card key={item.id} className="overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="relative h-48">
                    <ImageWithFallback
                      src={item.image || ""}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle>{item.name}</CardTitle>
                      <Badge variant="secondary" className="bg-secondary">
                        ₱{item.price.toFixed(2)}
                      </Badge>
                    </div>
                    <CardDescription>{item.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button 
                      className="w-full bg-primary hover:bg-primary/90" 
                      onClick={() => addToCart(item)}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add to Cart
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}