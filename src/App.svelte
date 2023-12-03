<script>
import Home from "./components/Home.svelte";
import {Router, Route} from "svelte-routing"
import About from "./components/About.svelte"
</script>


<Router>
    <Route path = '/' component = {Home} />
    <Route path = '/about' component = {About} />
</Router>



<style>

</style>
